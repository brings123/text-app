const { app } = require('./server')
const request = require('supertest')
const seedDb_testing = require('./utils/seedDb_testing')

// set the node environement to testing
beforeAll(() => {
    process.env.NODE_ENV = 'test'
})

// @desc testing the GET /text/?page=..&limit=.. endpoint
test('GET /text/?page=1&limit=1',async () => {
    
        seedDb_testing()
        const res = await request(app).get('/text/?page=1&limit=1');
        const response = {
            next:{
                page:2,
                limit:1
            },
            results:[
                {
                    _id:1,
                    en:"This is a legal test text text",
                    fr:"Ceci est un texte légale pour les tests",
                    ar:"هذا نص قانوني لغرض التجريب"
                }
            ]
        } 

        expect(res.status).toBe(200);
        expect(res.body).toEqual(response);
})

// @desc testing the POST /text/ endpoint
test('POST /text/',async () => {
    
        seedDb_testing()
        await request(app)
            .post('/text/')
            .send({
                en:"This is a third legal test text",
                fr:"Ceci est le troisième texte légale pour les tests",
                ar:"هذا نص قانوني ثالث لغرض التجريب"
            });
        const res = await request(app).get('/text/');
        const response = {
            results:[
                {
                    _id:1,
                    en:"This is a legal test text text",
                    fr:"Ceci est un texte légale pour les tests",
                    ar:"هذا نص قانوني لغرض التجريب"
                },
                {
                    _id:2,
                    en:"This is a second legal test text text",
                    fr:"Ceci est le deuxième texte légale pour les tests",
                    ar:"هذا نص قانوني ثاني لغرض التجريب"
                },
                {
                    _id:3,
                    en:"This is a third legal test text",
                    fr:"Ceci est le troisième texte légale pour les tests",
                    ar:"هذا نص قانوني ثالث لغرض التجريب"
                }
            ]
        } 

        expect(res.status).toBe(200);
        expect(res.body).toEqual(response);
})

// @desc testing the PUT /text/:textId endpoint 
test('PUT /text/:textId',async () => {
    jest.setTimeout(30000)
    seedDb_testing()

    await request(app)
        .put('/text/2')
        .send({
            en:"This is the second legal test text updated",
            fr:"Ceci est le deuxième texte légale pour les tests modifié",
            ar:"هذا نص قانوني ثالث لغرض التجريب مغير"
        });

    const res = await request(app).get('/text/')
    
    const response = {
        results:[
            {
                _id:1,
                en:"This is a legal test text text",
                fr:"Ceci est un texte légale pour les tests",
                ar:"هذا نص قانوني لغرض التجريب"
            },
            {
                _id:2,
                en:"This is the second legal test text updated",
                fr:"Ceci est le deuxième texte légale pour les tests modifié",
                ar:"هذا نص قانوني ثالث لغرض التجريب مغير"
            }
        ]
    } 
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual(response);
})

// @desc testing the GET /text/:textId/count endpoint 
test('GET /text/:textId/count',async () => {
    seedDb_testing()
    const res = await request(app).get('/text/2/count')
    const response = {
        ar:6,
        fr:9,
        en:8,
        total: 6 + 9 + 8
    } 
    expect(res.status).toBe(200)
    expect(res.body).toEqual(response)
})

// @desc testing the GET /text/:textId/count/:language endpoint
test('GET /text/:textId/count/:language',async () => {
    seedDb_testing()
    
    const res = await request(app).get('/text/2/count/fr')
    
    const response = {
        count:9
    } 

    expect(res.status).toBe(200)
    expect(res.body).toEqual(response)
})

// @desc testing the GET /text/mostOccurent endpoint
test('GET /text/mostOccurent',async () => {
    seedDb_testing()
    
    const res = await request(app).get('/text/mostOccurent')
    
    const response = { 
        occurence: 4,
        word: "text",
        language: "en"
    }
    
    expect(res.status).toBe(200)
    expect(res.body).toEqual(response)
})

// @desc testing the GET /text/search?q=.. (fuzzy search) endpoint
test('GET /text/search?q=',async () => {
    seedDb_testing()
    
    const res = await request(app).get('/text/search?q=econd')
    const response = {
        results:[
            {
                item:{
                    _id:2,
                    en:"This is a second legal test text text",
                    fr:"Ceci est le deuxième texte légale pour les tests",
                    ar:"هذا نص قانوني ثاني لغرض التجريب"
                },
                refIndex:1
            }
            
        ]
    } 
    
    expect(res.status).toBe(200)
    expect(res.body).toEqual(response)
})