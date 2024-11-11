import { parseArgs } from "@std/cli";
import { Decoder, Profile, Stream, Utils } from "@garmin/fitsdk";

export async function main(file) {
  const buf = await Deno.readFile(file);
  const streamfromFileSync = Stream.fromBuffer(buf);
  // console.log("isFIT: " + Decoder.isFIT(streamfromFileSync));

  if (!Decoder.isFIT(streamfromFileSync)) {
    console.error("Not a FIT file");
    Deno.exit(1);
  }

  const decoder = new Decoder(streamfromFileSync);
  const { messages, errors } = decoder.read();

  const result = {};
  result["dateUTC"] = messages.fileIdMesgs[0].timeCreated;
  result["positionsLatLong"] = messages.recordMesgs.map((record) => {
    try {
      return {
        lat: parseFloat((record.positionLat / 11930465.0).toFixed(6)),
        long: parseFloat((record.positionLong / 11930465.0).toFixed(6)),
      };
    } catch (error) {
      console.error(error);
    }
  });
  return result;
}

if (import.meta.main) {
  const args = parseArgs(Deno.args);
  let file = null;
  if (args.f) {
    file = args.f;
  } else if (args._.length === 1) {
    file = args._[0];
  } else if (args._.length !== 1) {
    console.error("Usage: deno task parse <fitfile>");
    Deno.exit(1);
  }
  console.log(JSON.stringify(await main(file)));
}
