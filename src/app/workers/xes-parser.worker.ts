/// <reference lib="webworker" />
import {XesParser} from "../classes/EventLog/xesParser";

addEventListener('message', ({ data }) => {
    const parser = new XesParser();
    const result = parser.parse(data);
    postMessage(result);
});
