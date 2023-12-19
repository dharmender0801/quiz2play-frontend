export class HelpList{
        id: number | undefined;
        portalId:     string | undefined;
        serviceId:    string | undefined;
        title:    string | undefined;
        imageUrl:string | undefined;
        status: boolean  | undefined;
        helpDescriptionModel:HelpDescriptionModel[] | undefined 
}
export class HelpDescriptionModel{
        id: number | undefined;
        portalId: string | undefined;
        serviceId: string | undefined;
        desc:    string | undefined;
        status: boolean | undefined
   
}