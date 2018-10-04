export class FaceRectangle {
  width: number;
  height: number;
  left: number;
  top: number;
}

export class PupilLeft {
  x: number;
  y: number;
}

export class PupilRight {
  x: number;
  y: number;
}

export class NoseTip {
  x: number;
  y: number;
}

export class MouthLeft {
  x: number;
  y: number;
}

export class MouthRight {
  x: number;
  y: number;
}

export class EyebrowLeftOuter {
  x: number;
  y: number;
}

export class EyebrowLeftInner {
  x: number;
  y: number;
}

export class EyeLeftOuter {
  x: number;
  y: number;
}

export class EyeLeftTop {
  x: number;
  y: number;
}

export class EyeLeftBottom {
  x: number;
  y: number;
}

export class EyeLeftInner {
  x: number;
  y: number;
}

export class EyebrowRightInner {
  x: number;
  y: number;
}

export class EyebrowRightOuter {
  x: number;
  y: number;
}

export class EyeRightInner {
  x: number;
  y: number;
}

export class EyeRightTop {
  x: number;
  y: number;
}

export class EyeRightBottom {
  x: number;
  y: number;
}

export class EyeRightOuter {
  x: number;
  y: number;
}

export class NoseRootLeft {
  x: number;
  y: number;
}

export class NoseRootRight {
  x: number;
  y: number;
}

export class NoseLeftAlarTop {
  x: number;
  y: number;
}

export class NoseRightAlarTop {
  x: number;
  y: number;
}

export class NoseLeftAlarOutTip {
  x: number;
  y: number;
}

export class NoseRightAlarOutTip {
  x: number;
  y: number;
}

export class UpperLipTop {
  x: number;
  y: number;
}

export class UpperLipBottom {
  x: number;
  y: number;
}

export class UnderLipTop {
  x: number;
  y: number;
}

export class UnderLipBottom {
  x: number;
  y: number;
}

export class FaceLandmarks {
  pupilLeft: PupilLeft;
  pupilRight: PupilRight;
  noseTip: NoseTip;
  mouthLeft: MouthLeft;
  mouthRight: MouthRight;
  eyebrowLeftOuter: EyebrowLeftOuter;
  eyebrowLeftInner: EyebrowLeftInner;
  eyeLeftOuter: EyeLeftOuter;
  eyeLeftTop: EyeLeftTop;
  eyeLeftBottom: EyeLeftBottom;
  eyeLeftInner: EyeLeftInner;
  eyebrowRightInner: EyebrowRightInner;
  eyebrowRightOuter: EyebrowRightOuter;
  eyeRightInner: EyeRightInner;
  eyeRightTop: EyeRightTop;
  eyeRightBottom: EyeRightBottom;
  eyeRightOuter: EyeRightOuter;
  noseRootLeft: NoseRootLeft;
  noseRootRight: NoseRootRight;
  noseLeftAlarTop: NoseLeftAlarTop;
  noseRightAlarTop: NoseRightAlarTop;
  noseLeftAlarOutTip: NoseLeftAlarOutTip;
  noseRightAlarOutTip: NoseRightAlarOutTip;
  upperLipTop: UpperLipTop;
  upperLipBottom: UpperLipBottom;
  underLipTop: UnderLipTop;
  underLipBottom: UnderLipBottom;
}

export class FacialHair {
  moustache: number;
  beard: number;
  sideburns: number;
}

export class HeadPose {
  roll: number;
  yaw: number;
  pitch: number;
}

export class Emotion {
  anger: number;
  contempt: number;
  disgust: number;
  fear: number;
  happiness: number;
  neutral: number;
  sadness: number;
  surprise: number;
}

export class HairColor {
  color: string;
  confidence: number;
}

export class Hair {
  bald: number;
  invisible: boolean;
  hairColor: Array<HairColor>;
}

export class Makeup {
  eyeMakeup: boolean;
  lipMakeup: boolean;
}

export class Occlusion {
  foreheadOccluded: boolean;
  eyeOccluded: boolean;
  mouthOccluded: boolean;
}

export class Accessory {
  type: string;
  confidence: number;
}

export class Blur {
  blurLevel: string;
  value: number;
}

export class Exposure {
  exposureLevel: string;
  value: number;
}

export class Noise {
  noiseLevel: string;
  value: number;
}

export class FaceAttributes {
  age: number;
  gender: string;
  smile: number;
  facialHair: FacialHair;
  glasses: string;
  headPose: HeadPose;
  emotion: Emotion;
  hair: Hair;
  makeup: Makeup;
  occlusion: Occlusion;
  accessories: Array<Accessory>;
  blur: Blur;
  exposure: Exposure;
  noise: Noise;
}

export class DetectResult {
  faceId: string;
  faceRectangle: FaceRectangle;
  faceLandmarks: FaceLandmarks;
  faceAttributes: FaceAttributes;
}