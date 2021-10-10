import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import serveFavicon from 'serve-favicon';
import { join } from 'path';

export default (app: Express) => {
	const publicDir = join(__dirname, '../public');
	const nodeModule = join(__dirname, '../../node_modules');
	app.use(cors());
	app.use(compression());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(serveFavicon(`${publicDir}/favicon.ico`));
	app.use(express.static(publicDir));
	app.use('/src/jquery', express.static(`${nodeModule}/jquery/dist`));
	app.use('/src/bootstrap', express.static(`${nodeModule}/bootstrap/dist`));
	app.use((req, res) => res.status(404).end('error'));
};
