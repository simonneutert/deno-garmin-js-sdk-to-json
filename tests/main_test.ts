import { assert, assertEquals } from "@std/assert";
import { main } from "../main.js";

Deno.test("test main results", async () => {
  const result = await main("./tests/strava.fit");
  assertEquals(Object.keys(result), ["dateUTC", "positionsLatLong"]);
  assert(result.dateUTC instanceof Date);
  assert(result.positionsLatLong instanceof Array);
  assert(result.positionsLatLong.length > 0);
  assertEquals(result.positionsLatLong.length, 3462);
  assert(result.positionsLatLong.every((p) => (p.lat && p.long)));
  assertEquals(result.positionsLatLong[0].lat, 49.973987);
  assertEquals(result.positionsLatLong[0].long, 8.242793);
});
