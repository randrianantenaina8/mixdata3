import { LandDO } from "@/data/domain_object/crm/land.do";

export const landIds = [
    {
        land_id: 1985744,
        code_number: 675,
    },
    {
        land_id: 1986233,
        code_number: 7964,
    },
    {
        land_id: 1991157,
        code_number: 2259,
    },
    {
        land_id: 2001096,
        code_number: 11244,
    },
    {
        land_id: 2022719,
        code_number: 10849,
    },
    {
        land_id: 2009380,
        code_number: 1926,
    },
    {
        land_id: 2031155,
        code_number: 76,
    },
    {
        land_id: 1965738,
        code_number: 4773,
    },
    {
        land_id: 2000091,
        code_number: 6046,
    },
    {
        land_id: 2003924,
        code_number: 1907,
    },
];

let idx = 0;

/*
setSeederFactory(LandDO, (faker) => {
    const landId = idx;
    idx = idx >= landIds.length ? 0 : idx + 1;

    const land = new LandDO();
    land.code = landIds[landId].code_number.toString();
    land.externalId = landIds[landId].land_id.toString();

    return land;
});
*/
