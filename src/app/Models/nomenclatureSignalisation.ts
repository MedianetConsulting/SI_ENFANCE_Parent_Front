import { NomenclatureConcerne } from "./nomenclatureConcerne";
import { NomenclatureDelegation } from "./nomenclatureDelegation";
import { NomenclatureGouvernorat } from "./nomenclatureGouvernorat";
import { NomenclatureInformateur } from "./nomenclatureInformateur";

export class NomenclatureSignalisation{
    codeSignalisation!:string;
    nomInformateur!:string;
    tel!:string;
    ville!:string;
    email!:string;
    nomConcerne!:string;
    etablissement!:string;
    villeConcerne!:string;
    adresseConcerne!:string;
    message!:string;
    dateCreation!:Date;


    codeInformateur!:string;
    codeConcerne!:string;
    codeGouv!:string;
    codeDele!:string;


    CodeConcerneNavigation!:NomenclatureConcerne;
    CodeInformateurNavigation!:NomenclatureInformateur;
    CodeDeleNavigation!:NomenclatureDelegation;
    CodeGouvNavigation!:NomenclatureGouvernorat;
    
}