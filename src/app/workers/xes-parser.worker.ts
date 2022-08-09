/// <reference lib="webworker" />
import {XesParser} from "../classes/EventLog/xesParser";
import { TypedJSON } from "typedjson";
import { EventLog } from "../classes/EventLog/eventlog";

addEventListener('message', ({ data }) => {
    const parser = new XesParser();
    const result = parser.parse(data);
    const serializer = new TypedJSON(EventLog);
    const jsonResult = serializer.stringify(result);
    postMessage(jsonResult);
});
