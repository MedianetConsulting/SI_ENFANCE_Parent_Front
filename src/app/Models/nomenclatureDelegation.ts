import { NomenclatureGouvernorat } from "./nomenclatureGouvernorat";

export class NomenclatureDelegation{
    codeDele!: string;
    libeDele!: string;
    codeGouv!: string;
    ordrAffi!: string;
    acti!: boolean;
    codeGouvNavigation!: NomenclatureGouvernorat;
}