

















// describe('POST, user input search strings returns array of 5 attractions per search string', () => {
//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   // test('the response code is 201', async () => {
//   //   let response = await request(app)
//   //     .post('/attractions')
//   //     .send(["Hackney Farm"])
//   //   expect(response.statusCode).toBe(201);
//   // });

//   test('When empty input array it should return 400', async () => {
//     let response = await request(app)
//       .post('/attractions')
//       .send([])
//     expect(response.statusCode).toEqual(400);
//   });
    
//   test('When given two string locations it should return an array of two object with the first nearby place', async () => {
//     fetch.mockResponseOnce(JSON.stringify(singlePlaceMock))
//     const response = await request(app)
//       .post('/attractions')
//       .send(["Heathrow Airport"])
//     // expect(fetch.mock.calls.length).toEqual(1);
//     expect(response.body[0].name).toBe("Edinburgh Castle");
//   });




  
  // test('When given four string locations it should return an array of four objects with coordinates', async () => {
  //   let response = await request(app)
  //     .post('/attractions')
  //     .send(["Makers Academy", "London Eye", "Le Wagon", "Tower Bridge"])
  //   expect(response.body[0].prominentAttraction.name).toEqual("All Hallows-On-The Wall")
  //   expect(response.body[1].prominentAttraction.name).toEqual("Old War Office Building")
  //   expect(response.body[2].prominentAttraction.name).toEqual("Hackney City Farm")
  //   expect(response.body[3].prominentAttraction.name).toEqual("Butler's Wharf Pier.")
  // });
// });
  
