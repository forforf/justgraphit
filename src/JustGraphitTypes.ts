
// Not perfect, but ok for now. Maybe improve if typescript supports regexes
export type ISODatetimeType = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type GraphName = string;

export type DateOrIso = Date | ISODatetimeType;

// individual data points
export type JustGraphitEntry = {
  number: number;
  datetime: ISODatetimeType;
  dt?: Date;
}

export type JustGraphitStore = Record<GraphName, JustGraphitEntry[]>

export type PassthroughFunction = (...args: unknown[]) => unknown;

export type RefSvg = SVGSVGElement | null;

export type D3Select = (ref: RefSvg) => PassthroughFunction;

// Functions that handle graphs by graphName (changing graphs, deleting graphs, etc)
export type GraphHandler = (graphName: GraphName) => void;

export type GraphEntryHandler = (graphName: GraphName, numberInput: string) => void;