import { StatusDescription } from "../models/status-description";

export class LangResponse{
statusDescription = new StatusDescription();
languageList:LangList | undefined

    
}



export class LangList{
    id: number  |undefined;
    lang: string  | undefined;
    langShortCode: string  | undefined;
    status: boolean  | undefined;
    portalId: string | undefined;
}