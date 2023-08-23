export interface UpdateOfferApplication {
    readonly _id: string
    readonly offerId: string
    readonly entrepriseId: String
    readonly consultantId: String
    readonly appliedAt: Date
    readonly status: string;
}
