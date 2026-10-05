/** Symbols the background particle cloud can form (AI, software, robotics, security, the journey). */
export const shapeNames = ["network", "code", "chip", "globe", "arm", "gear", "shield", "padlock"] as const;

export type ShapeName = (typeof shapeNames)[number];
