export declare class Info {
    private static wipValue;
    private static gamesValue?;
    static wip: boolean;
    static readonly games: ReadonlyArray<any>;
    static game(id: string): any;
    static similar(id: string, exclude: string): any[];
}
