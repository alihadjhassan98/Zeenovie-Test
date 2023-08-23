export interface UpdateOfferInfo {
    readonly IdUser: string;
    //Offer Info
    readonly titleO: string;
    readonly descriptionE: string;
    readonly referenceO: string;
    //offer details
    readonly TypesOfPositions: string[];
    readonly Availability: string;
    readonly DesiredMinimumNetSalary: number;
    readonly DesiredMaximumNetSalary: number;
    readonly in: string;
    readonly LevelOfEducation: string;
    readonly LevelOfExperience: string;
    readonly languages: string[];
    readonly Jobs: string[];
    readonly JobCategorie: string[];
    //offer place
    readonly Address: string;
    readonly Region: string;
    readonly City: string;
    readonly    mobility:string[];

    //offer settings
    readonly date: Date;
    readonly dateFin: Date;
    readonly responable: string;
    readonly emailforsendmails: string;
    readonly  isAccepted: boolean ;
}
