
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video } from '@google/genai';

export enum AppState {
  LOGIN,
  DASHBOARD,
}

export type LoginMethod = 'Facebook' | 'Email' | 'VK';

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: 'pfp',
    name: 'FOTO DE PERFIL',
    price: 7,
    description: 'Arte personalizada para sua foto de perfil.',
    icon: 'User'
  },
  {
    id: 'banner',
    name: 'BANNER',
    price: 7,
    description: 'Capa profissional para redes sociais ou YouTube.',
    icon: 'Layout'
  },
  {
    id: 'combo',
    name: 'FOTO DE PERFIL + BANNER',
    price: 15,
    description: 'Identidade visual completa para seu canal.',
    icon: 'Layers'
  },
  {
    id: 'tumbs',
    name: 'TUMBS',
    price: 10,
    description: 'Thumbnails chamativas que aumentam seus cliques.',
    icon: 'Image'
  },
  {
    id: 'live_cover',
    name: 'CAPA DE LIVE',
    price: 8,
    description: 'Design exclusivo para suas transmissões ao vivo.',
    icon: 'Tv'
  }
];

// Add missing types for video generation
export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
}

export enum VeoModel {
  VEO_FAST = 'veo-3.1-fast-generate-preview',
  VEO = 'veo-3.1-generate-preview',
}

export enum GenerationMode {
  TEXT_TO_VIDEO = 'Text to Video',
  FRAMES_TO_VIDEO = 'Frames to Video',
  REFERENCES_TO_VIDEO = 'References to Video',
  EXTEND_VIDEO = 'Extend Video',
}

export interface ImageFile {
  file: File;
  base64: string;
}

export interface VideoFile {
  file: File;
  base64: string;
}

export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  mode: GenerationMode;
  startFrame?: ImageFile | null;
  endFrame?: ImageFile | null;
  referenceImages?: ImageFile[];
  styleImage?: ImageFile | null;
  inputVideo?: VideoFile | null;
  inputVideoObject?: Video | null;
  isLooping?: boolean;
}
