# Garmin Javascript SDK

This project is a thin wrapper around the [Garmin Javascript SDK](https://github.com/garmin/fit-javascript-sdk). It utilizes the SDK to convert a FIT file to JSON.

Because it is using the SDK, please read the [license](https://github.com/garmin/fit-javascript-sdk/blob/main/LICENSE.txt) of the SDK.

```bash
deno task parse -f <path-to-fit-file>
# or
deno task parse <path-to-fit-file>
```

## JSON content

Example of the JSON content:

```json
{
    "dateUTC": "2021-06-06T14:00:00.000Z",
    "positionsLatLong": [
        {
            "latitude": 48.851282, // 6 digits
            "longitude": 8.291245 // 6 digits
        },
        {
            "latitude": 48.851283, // 6 digits
            "longitude": 8.391245 // 6 digits
        }
    ]
}
