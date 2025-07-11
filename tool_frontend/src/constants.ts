export type Video = {
    vod_id: string;
    vod_name: string;
    vod_pic: string;
    type_name: string;
    type_id: number;
    type_ids: number[];
    vod_play_url: {
        name: string;
        url: string;
    }[];
    vod_content: string;
    vod_actor: string;
    vod_banner?: string;
    vod_pc_banner?: string;
    vod_mobile_banner?: string;
    vod_lang: string;
    vod_year: string;
    vod_area: string;
    title: string;
    status: string;
    is_geo_restricted: boolean;
};

export const domains = {
    stg: 'https://svideos.stg.nivod.dev',
    aiyifan: 'https://aiyifan.nivod.pro',
    nivod: 'https://nivod.pro',
};

export const litemodes = {
    lite: 'lite',
};