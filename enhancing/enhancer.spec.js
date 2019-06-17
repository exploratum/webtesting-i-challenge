const { repair, succeed, fail, get } = require('./enhancer.js');

describe('enhancer.js', () => {
    /*****************************************************************************/
    /*                              Repair                                       */
    /*****************************************************************************/
  describe('repair()', () => {
    it('restores durability to 100', () => {
      expect(repair({ durability: 89 }).durability).toBe(100);
      expect(repair({ durability: -89 }).durability).toBe(100);
      expect(repair({ durability: 100 }).durability).toBe(100);
      expect(repair({ durability: 0 })).toEqual({ durability: 100 });
    });
  });

    /*****************************************************************************/
    /*                              Success                                      */
    /*****************************************************************************/

  describe('success()', ()=> {
      it('increases enhancement by 1', () => {
          expect(succeed({enhancement:10}).enhancement).toBe(11)
      })

      it('caps enhancement to 20', () => {
          expect(succeed({enhancement:20}).enhancement).toBe(20);
          expect(succeed({enhancement:30}).enhancement).toBe(20);
      })

      it('checks that durability has not changed', () => {
          expect(succeed({durability: 50}).durability).toBe(50);
          expect(succeed({durability: 110}).durability).toBe(110);
          expect(succeed({durability: 0}).durability).toBe(0);
          expect(succeed({durability: -50}).durability).toBe(-50);
      })
  })

    /*****************************************************************************/
    /*                               Fails                                       */
    /*****************************************************************************/
  describe('fail()', () => {
    it("checks that enhancement decreases by 1 only when it starts with values > 16", () => {
        expect(fail({enhancement:20}).enhancement).toBe(19);        
        expect(fail({enhancement:17}).enhancement).toBe(16);
        expect(fail({enhancement:16}).enhancement).toBe(16);
        expect(fail({enhancement:0}).enhancement).toBe(0);
    })

    it('Checks that durability decreases by 5 when enhancement is < 15', () => {
        expect(fail({enhancement: 14, durability: 50})).toEqual({enhancement:14, durability:45})
        expect(fail({enhancement: 1, durability: 50})).toEqual({enhancement:1, durability:45})

    })
    it('Checks that durability decreases by 10 and enhancement is unchanged when enhancement is 15 or 16', 
        () => {
        expect(fail({enhancement: 15, durability: 50})).toEqual({enhancement:15, durability:40})
        expect(fail({enhancement: 16, durability: 10})).toEqual({enhancement:16, durability:0})
    })

    it('Checks that durablity decreases by 10 and enhancement decreases by 1 when enhancement value > 16',
        () => {
        expect(fail({enhancement: 17, durability: 50})).toEqual({enhancement:16, durability:40})
        expect(fail({enhancement: 20, durability: 10})).toEqual({enhancement:19, durability:0})

    })
    it('Checks that durablity can  not go lower than 0 when enhancement is < 15',
        () => {
        expect(fail({enhancement: 14, durability: 4})).toEqual({enhancement:14, durability:0})
        expect(fail({enhancement: 1, durability: 0})).toEqual({enhancement:1, durability:0})
    })

    it('Checks that durablity can  not go lower than 0 when enhancement is >= 15',
        () => {
        expect(fail({enhancement: 15, durability: 4})).toEqual({enhancement:15, durability:0})
        expect(fail({enhancement: 20, durability: 0})).toEqual({enhancement:19, durability:0})

    })

  });

    /*****************************************************************************/
    /*                                  get                                      */
    /*****************************************************************************/

  describe('get()', () => {
    it('checks that the name is unchanged if enhancement is 0', () => {
        expect(get({name:'John', enhancement:0})).toEqual({name:'John', enhancement:0})
    });

    it('checks that the name is changed if enhancement is > 0', () => {
        expect(get({name:'John', enhancement:1})).toEqual({name:'[+1] John', enhancement:1})
        expect(get({name:'John', enhancement:20})).toEqual({name:'[+20] John', enhancement:20})

    })
  })

  





});

