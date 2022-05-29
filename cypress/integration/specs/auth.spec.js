
describe('api/user/register', () => {
    it('returns a CREATED SUCCESSFULLY response', () => {
        let body = {
            name: 'Agesa',
            email: 'Agesa@g.com',
            password: 'password123'
        }
        cy.request('POST', 'http://localhost:4000/api/user/register', body)
            .then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.name).to.eq('Agesa');
                expect(res.body.email).to.eq('Agesa@g.com');
                expect(res.body.password).to.eq('password123');

            }).then((res) => {
                cy.request('DELETE', 'http://localhost:4000/api/user/register/' + res.body._id);
            });
        
    });
    it('returns a FAILED TO CREATE status when we submit without a body', () => {
        cy.request({
            method:'POST',
            url: 'http://localhost:4000/api/user/register',
            failOnStatusCode: false
        })
            .then((res) => {
                expect(res.status).to.eq(401);
            });
    });
    describe('returns a FAILED TO CREATE for user', () => {
        it('with invalid name', () => {
            let body = {
                name: '1',
                email: 'Agesa@g.com',
                password: 'password123'
            }
            cy.request({
                method:'POST',
                url: 'http://localhost:4000/api/user/register',
                body,
                failOnStatusCode: false
            })
                .then((res) => {
                    expect(res.status).to.eq(401);
                });
        });
        it('with invalid email', () => {
            let body = {
                name: 'Agesa',
                email: 'a.com',
                password: 'password123'
            }
            cy.request({
                method:'POST',
                url: 'http://localhost:4000/api/user/register',
                body,
                failOnStatusCode: false
            })
                .then((res) => {
                    expect(res.status).to.eq(401);
                });
        });
        it('with invalid password', () => {
            let body = {
                name: 'Agesa',
                email: 'Agesa@g.com',
                password: 'pass'
            }
            cy.request({
                method:'POST',
                url: 'http://localhost:4000/api/user/register',
                body,
                failOnStatusCode: false
            })
                .then((res) => {
                    expect(res.status).to.eq(401);
                });
        });
    })

});


