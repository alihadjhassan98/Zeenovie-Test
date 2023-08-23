export interface UpdateProfessionalExperienceDto {
    readonly IdUser: string;
    readonly CurrentJob: boolean;
    readonly Period: Date;
    readonly Until: Date;
    readonly JobTitle: string;
    readonly JobType: string;
    readonly Employer: string;
    readonly Workplace: string;
    readonly Industry: string;
    readonly CompanySize: string;
    readonly CompanyCategory: string;
    readonly ManagementPosition: boolean;
    readonly MonthlyNetSalary: string;
    readonly TasksAndMissions: string;
}
 