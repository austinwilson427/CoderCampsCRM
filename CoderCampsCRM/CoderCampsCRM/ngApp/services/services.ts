namespace MyApp.Services {

    export class MovieService {
        private MovieResource;

        public listMovies() {
            return this.MovieResource.query();
        }

        constructor($resource: angular.resource.IResourceService) {
            this.MovieResource = $resource('/api/movies/:id');
        }
    }

    angular.module('MyApp').service('movieService', MovieService);

}