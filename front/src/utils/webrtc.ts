function findLineInRange(
  sdpLines: any[],
  startLine: number,
  endLine: number,
  prefix: string,
  substr: string,
): number | null {
  const realEndLine = endLine !== -1 ? endLine : sdpLines.length;
  for (let i = startLine; i < realEndLine; i += 1) {
    if (sdpLines[i].indexOf(prefix) === 0) {
      if (
        !substr
        || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1
      ) {
        return i;
      }
    }
  }
  return null;
}

function findLine(sdpLines: any[], prefix: string, substr: string): number | null {
  return findLineInRange(sdpLines, 0, -1, prefix, substr);
}

function getCodecPayloadType(sdpLine: string) {
  const pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
  const result = sdpLine.match(pattern);
  return result && result.length === 2 ? result[1] : null;
}

/* payload에 해당하는 codec 제거 */
function removeCodec(mLine: string, payload: string) {
  const elements = mLine.split(' ');
  const newLine = [];
  let index = 0;
  for (let i = 0; i < elements.length; i += 1) {
    if (elements[i] !== payload) {
      newLine[index] = elements[i];
      index += 1;
    }
  }
  return newLine.join(' ');
}


/* iPhone 의 경우 H264 코덱을 통한 비디오 연결에 문제가 있어 sdp video 설정에서 우선 순위를 낮춘다 */
export function reorderCodec(sdp: string): string {
  const sdpLines = sdp.split('\r\n');
  const mLineIndex = findLine(sdpLines, 'm=', 'video');
  if (mLineIndex === null) {
    return sdp;
  }
  const h264Index = findLine(sdpLines, 'a=rtpmap', 'H264');
  const vp8Index = findLine(sdpLines, 'a=rtpmap', 'VP8');
  if (h264Index && vp8Index) {
    const payload = getCodecPayloadType(sdpLines[h264Index]);
    if (payload) {
      sdpLines[mLineIndex] = removeCodec(sdpLines[mLineIndex], payload);
      sdpLines[mLineIndex] += ` ${payload}`;
    }
    let i = h264Index;
    while (i < sdpLines.length) {
      const isH264Line = findLineInRange(sdpLines, i, i + 1, 'a=', ':120');
      const isNewCodec = getCodecPayloadType(sdpLines[i]);
      if (!isH264Line || (isNewCodec && isNewCodec !== payload)) break;
      i += 1;
    }
    sdpLines.splice(h264Index, i - h264Index);
  }
  const ret = sdpLines.join('\r\n');
  return ret;
}

/* mLine: sdp line ex) m=audio 9 RTP/SAVPF 103 111 104 9 0 8 106 105 13 126
 * 코덱을 원하는 payload로 설정한다 */
function setDefaultCodec(mLine: string, payload: string) {
  const elements = mLine.split(' ');
  const newLine = [];
  let index = 0;
  for (let i = 0; i < elements.length; i += 1) {
    if (index === 3) {
      newLine[index] = payload;
      index += 1;
    }
    if (elements[i] !== payload) {
      newLine[index] = elements[i];
      index += 1;
    }
  }
  return newLine.join(' ');
}

export function applyWorkaroundForCompat(sdp: string) {
  // https://code.google.com/p/webrtc/issues/detail?id=2796
  // 이 이슈에 따라 새 버전에서 'UDP/TLS/RTP/SAVPF' 포맷으로 보내면 기존 WebRTC와 호환이 안되어서 문제가 생긴다.
  // 구 WebRTC와 호환 유지를 위해서 기존대로 'RTP/SAVPF' 로 보내도록 임시로 처리를 해두도록 한다.
  return sdp.replace('UDP/TLS/RTP/SAVPF', 'RTP/SAVPF');
}

export function preferAudioCodec(sdp: string, codec: string) {
  const sdpLines = sdp.split('\r\n');
  const mLineIndex = findLine(sdpLines, 'm=', 'audio');
  if (mLineIndex === null) {
    return sdp;
  }
  const codecIndex = findLine(sdpLines, 'a=rtpmap', codec);
  if (codecIndex) {
    const payload = getCodecPayloadType(sdpLines[codecIndex]);
    if (payload) {
      sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], payload);
    }
  }
  const ret = sdpLines.join('\r\n');
  return ret;
}

export function formatDescription(desc: RTCSessionDescriptionInit): RTCSessionDescriptionInit {
  let newSdp = desc.sdp ? desc.sdp : '';
  newSdp = applyWorkaroundForCompat(newSdp);
  newSdp = preferAudioCodec(newSdp, 'ISAC');

  const newDesc = {
    type: desc.type,
    sdp: newSdp,
  };
  return newDesc;
}
