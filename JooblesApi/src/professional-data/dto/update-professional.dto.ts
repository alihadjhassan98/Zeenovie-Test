export interface UpdateProfessionalDataDto {
    readonly IdUser: string;
    readonly Title: string;  // Titre (lecture seule)
    readonly LevelOfEducation: string;  // Niveau d'éducation (lecture seule)
    readonly LevelOfExperience: string;  // Niveau d'expérience (lecture seule)
    readonly CurrentNetSalary: number;  // Salaire net actuel (lecture seule)
    readonly ProfessionalSituation: string;  // Situation professionnelle (lecture seule)
    readonly Availability: string;  // Disponibilité (lecture seule)
    readonly DesiredMinimumNetSalary: number;  // Salaire net minimum souhaité (lecture seule)
    readonly Jobs: string[]; //table de metiers
    readonly JobCategorie: string[];//chaque metier a plus de categogrie
    readonly SectorsOfActivity: string[];//table des secteurs d'activité
    readonly TypesOfPositions: string[];//table de string
    readonly Address : string;
    readonly Region : string;
    readonly City : string;
    readonly Occupation: string[];//table de stringes
    readonly Mobility: string[];//table de string 
}