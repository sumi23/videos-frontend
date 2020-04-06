import { ReferenceArtifact } from './reference-artifact';
import { SampleProgram } from './sample-program';
import { Referenceurl } from './referenceurl';
import { Level } from './level';
import { Category } from './category';

export class Video {

    id:number;
    name:string;
    displayName:string;
    url:string;
    duration:string;
    tags:string;
    status:Boolean;
    description:string;
    file:string;
    level:Level;
    category:Category;
    referenceArtifact:ReferenceArtifact[];
    sampleProgram:SampleProgram[];
    referenceUrl:Referenceurl[];
}

