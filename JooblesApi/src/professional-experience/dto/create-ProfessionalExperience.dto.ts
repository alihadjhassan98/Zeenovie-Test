export interface CreateProfessionalExperienceDto {
    readonly IdUser: string;
    readonly CurrentJob: boolean;  // Emploi actuel (lecture seule)
    readonly Period: Date;  // Période (lecture seule)
    readonly Until: Date;  // Jusqu'à (lecture seule)
    readonly JobTitle: string;  // Intitulé du poste (lecture seule)
    readonly JobType: string;  // Type de poste (lecture seule)
    readonly Employer: string;  // Employeur (lecture seule)
    readonly Workplace: string;  // Lieu de travail (lecture seule)
    readonly Industry: string;  // Secteur d'activité (lecture seule)
    readonly CompanySize: string;  // Taille de l'entreprise (lecture seule)
    readonly CompanyCategory: string;  // Catégorie de l'entreprise (lecture seule)
    readonly ManagementPosition: boolean;  // Poste de direction (lecture seule)
    readonly MonthlyNetSalary: string;  // Salaire net mensuel (lecture seule)
    readonly TasksAndMissions: string;  // Tâches et missions (lecture seule)

    // this is wheen u stoped mate complete the dto tommorow and good luck cowboy.

    // git branch is working fine.
}