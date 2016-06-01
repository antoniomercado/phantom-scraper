# Phantom Scraper

This project is an example Node.js scraper that utilizes PhantomJs to read web pages asynchronously. 

All javascript files in the `./scrapers` directory should adhere to the same interface as example.js. 

Each file should represent a single site. A basic understanding of promises and the bluebird promise library will go a long way in understanding the control flow of the scraper.

## Running in docker

`docker build -t phantom-scraper .`

`docker run phantom-scraper`


## Contributing
This package is under development to provide more examples. Pull requests are welcomed.

## License

[GNU GPL 3.0](LICENSE.md)
