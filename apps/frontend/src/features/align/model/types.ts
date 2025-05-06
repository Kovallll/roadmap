export type AlignmentLine = {
  type: 'x' | 'y';
  value: number;
  axis: number;
};

export interface AlignLinesState {
  lines: AlignmentLine[];
  setLines: (lines: AlignmentLine[]) => void;
}
