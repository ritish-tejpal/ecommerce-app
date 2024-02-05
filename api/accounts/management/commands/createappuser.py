from django.core.management.base import BaseCommand
from django.conf import settings
from accounts.models import User
from django.core.validators import validate_email

class Command(BaseCommand):
    help = "Create app user"

    def add_arguments(self, parser):
        '''
        add arguments to command
        '''
        parser.add_argument(
            '--refresh', '-r', dest='refresh', action='store_true', default=False,
            help=self.help,
        )

    def handle(self, *args, **options):
        '''
        handle error cases
        '''
        refresh = options.get('refresh', None)
        self.stdout.write(
            self.style.WARNING(
                'Note: Run this command after migrating(`python manage.py migrate oauth2_provider`) oauth app and user app')
        )
        answer = str(input('Have you migrated the required models?(y/n): ')).lower()
        if answer == 'y':
            self.create_application()
        else:
            self.stdout.write(self.style.NOTICE('App user and application aborted.'))
        return refresh

    def create_application(self):
        '''
        create oauth application
        '''
        from oauth2_provider.models import Application
        if not hasattr(settings, 'APPLICATION_NAME'):
            self.stdout.write(self.style.NOTICE('Add an APPLICATION_NAME in settings.py file then try again.'))
        else:
            try:
                # check if app user already created. There will be only one app user.
                if Application.objects.count() > 0:
                    raise Exception('App user and application are already created')
                app_user = self.create_app_user()
                if app_user:
                    app = Application()
                    app.user = app_user
                    app.client_type = 'confidential'
                    app.authorization_grant_type = 'password'
                    app.name = settings.APPLICATION_NAME
                    app.save()
                    self.stdout.write(self.style.SUCCESS('App user and application created.'))
                    self.stdout.write(self.style.SUCCESS('client_id: ' + app.client_id))
                    self.stdout.write(self.style.SUCCESS('client_secret: ' + app.client_secret))
            except Exception as ex:
                self.stdout.write(self.style.ERROR(ex))

    def create_app_user(self):
        '''
        create app user
        '''
        email = str(input('Enter email:'))
        password = str(input('Enter password:'))
        try:
            validate_email(email)
            app_user = User.objects.create(email=email, is_app_user=True)
            app_user.set_password(password)
            app_user.is_active = True
            app_user.save()
            self.stdout.write('App user with email: ' + email + ' and id: ' + str(
                app_user.pk) + ' created.')
            return app_user
        except Exception as ex:
            self.stdout.write(self.style.ERROR(ex))
            return None





