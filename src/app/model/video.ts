import { ReferenceArtifact } from './reference-artifact';
import { SampleProgram } from './sample-program';
import { Referenceurl } from './referenceurl';
import { Level } from './level';
import { Category } from './category';
import { Timestamp } from 'rxjs';

export class Video {

    id:number;
    name:string;
    displayName:string;
    url:string;
    duration:string;
    tags:string;
    status:Boolean;
    description:string;
    transcript:string;
    createdOn:Timestamp<Video>;
    createdBy:string;
    modifiedOn:Timestamp<Video>;
    modifiedBy:string;
    level:Level;
    category:Category;
    referenceArtifact:ReferenceArtifact[];
    sampleProgram:SampleProgram[];
    referenceUrl:Referenceurl[];

}

