import { mainTest } from "./test";

if (import.meta.env.MODE === "test") {
    mainTest();
}
