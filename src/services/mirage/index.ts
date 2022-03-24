import {ActiveModelSerializer, createServer, Factory, Model,Response} from 'miragejs'

import faker from 'faker'

type Branch = {
    name:string;
    employees:number;
}

export function makeServer(){
    const server = createServer({
        serializers:{
            application: ActiveModelSerializer
        },
        models:{
            branch: Model.extend<Partial<Branch>>({})
        },

        factories:{
            branch: Factory.extend({
                name(){
                    return faker.company.companyName()
                },
                employees(){
                    return faker.datatype.number()
                }
            })
        },
        seeds(server){
            server.createList('branch',2)
        },
        routes(){
            this.namespace = 'api';
            this.timing = 750;
            this.get('/branches');
            this.post('/branches');

            this.namespace = '';
            this.passthrough()
        }
    })
    return server
}