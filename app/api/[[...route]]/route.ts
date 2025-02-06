/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from 'hono';
import {handle} from 'hono/vercel'
import auth from '@/features/auth/server/route';
import listings from '@/features/listings/server/route';

const app = new Hono().basePath('/api');
const routes = app
.route('/auth', auth)
.route('/listings',listings)


export const GET = handle(app)
export const POST= handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppTypes = typeof routes;
