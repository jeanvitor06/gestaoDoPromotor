import { Container } from './container';
import { addressFactory } from './factories/address';
import { apiFactory } from './factories/api';
import { cacheFactory } from './factories/cache';
import { churchFactory } from './factories/church';
import { eventFactory } from './factories/event';
import { facebookFactory } from './factories/facebook';
import { providerFactory } from './factories/provider';
import { logFactory } from './factories/log';
import { quizFactory } from './factories/quiz';
import { storageFactory } from './factories/storage';
import { tokenFactory } from './factories/token';
import { AddressService } from './models/address';
import { ApiService } from './models/api';
import { CacheService } from './models/cache';
import { ChurchService } from './models/church';
import { EventService } from './models/event';
import { FacebookService } from './models/facebook';
import { ProviderService } from './models/provider';
import { LogService } from './models/log';
import { QuizService } from './models/quiz';
import { StorageService } from './models/storage';
import { TokenService } from './models/token';

let container: Container;

export function init(): void {
  container = new Container();

  container.register<AddressService>('addressService', addressFactory);
  container.register<ApiService>('apiService', apiFactory);
  container.register<CacheService>('cacheService', cacheFactory);
  container.register<ChurchService>('churchService', churchFactory);
  container.register<EventService>('eventService', eventFactory);
  container.register<FacebookService>('facebookService', facebookFactory);
  container.register<ProviderService>('providerService', providerFactory);
  container.register<LogService>('logService', logFactory);
  container.register<QuizService>('quizService', quizFactory);
  container.register<StorageService>('storageService', storageFactory);
  container.register<TokenService>('tokenService', tokenFactory);

}

export function get<AddressService>(key: 'addressService'): AddressService;
export function get<ApiService>(key: 'apiService'): ApiService;
export function get<CacheService>(key: 'cacheService'): CacheService;
export function get<ChurchSevice>(key: 'churchService'): ChurchSevice;
export function get<EventService>(key: 'eventService'): EventService;
export function get<FacebookService>(key: 'facebookService'): FacebookService;
export function get<GooglekService>(key: 'googleService'): GooglekService;
export function get<LogService>(key: 'logService'): LogService;
export function get<ProfileService>(key: 'profileService'): ProfileService;
export function get<QuizService>(key: 'quizService'): QuizService;
export function get<StorageService>(key: 'storageService'): StorageService;
export function get<TokenService>(key: 'tokenService'): TokenService;
export function get<T>(key: string): T {
  if (!container) throw new Error('services not initialized');
  return container.get(key);
}