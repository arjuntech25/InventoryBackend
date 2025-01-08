export interface IActivityLog {
    Id: string;
    CollectionName : string;
    KeyValue : string;
    FieldName : string;
    OldValue : any;
    NewValue : any;
    CreatedOn : Date;
    CreatedBy : string;
    ModifiedOn : Date;
    ModifiedBy : string;

}