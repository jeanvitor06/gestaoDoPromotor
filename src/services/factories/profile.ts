import { churchSlug } from '../../settings';
import { Container } from '../container';
import { ProfileService } from '../models/profile';

export function profileFactory(container: Container): ProfileService {
  return new ProfileService(
    churchSlug,
    container.get('apiService'),
    container.get('cacheService'),
    container.get('tokenService')
  );
}