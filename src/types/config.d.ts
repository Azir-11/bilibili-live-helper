export type Speech = {
  isOpen: boolean;
  onWelcome: boolean;
  onDanmu: boolean;
  onGift: boolean;
  volume: number;
  speechVoice: string;
  rate: number;
  pitch: number;
};

export type SoundItem = {
  key: string;
  keyword: string[];
  status: boolean;
};

export type Sound = {
  isOpen: boolean;
  volume: number;
  files: SoundItem[];
};