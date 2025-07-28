
app.get('/updateCars/:id', checkAuthenticated, checkAdmin, (req, res) => {
    const carsId = req.params.id;
    const sql = 'SELECT * FROM cars WHERE carsId = ?';

    connection.query(sql, [carsId], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            res.render('updateCars', { cars: results[0] });
        } else {
            res.status(404).send('Car not found');
        }
    });
});


app.post('/updateCars/:id', upload.single('image'), (req, res) => {
    const carsId = req.params.id;
    const { plate, model, status } = req.body;

    let image = req.body.currentImage;
    if (req.file) {
        image = req.file.filename;
    }

    const sql = 'UPDATE cars SET plate = ?, model = ?, status = ?, image = ? WHERE carsId = ?';

    connection.query(sql, [plate, model, status, image, carsId], (error, results) => {
        if (error) {
            console.error("Error updating car:", error);
            res.status(500).send('Error updating car');
        } else {
            res.redirect('/inventory'); 
        }
    });
});




