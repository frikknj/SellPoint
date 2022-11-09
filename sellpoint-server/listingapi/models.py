from django.db import models
from userapi.models import Account, RegexValidator, Advertiser


class Listing(models.Model):
    CATEGORIES = (
        ("Antikviteter", ("Antikviteter og kunst ")),
        ("Dyr", ("Dyr og utstyr")),
        ("Elektronikk", ("Elektronikk og hvitevarer")),
        ("Foreldre", ("Foreldre og barn")),
        ("Fritid", ("Fritid, hobby og underholdning")),
        ("Hus", ("Hage, oppussing og hus")),
        ("Klær", ("Klær, kosmetikk og tilbehør")),
        ("Møbler", ("Møbler og interiør")),
        ("Næring", ("Næringsvirksomhet")),
        ("Sport", ("Sport og friluftsliv")),
        ("Fartøy", ("Utstyr til bil, båt og MC")),
    )
    TYPES = (
        ("Selge", "Sell"),
        ("Kjøpe", "Buy"),
        ("Gi vekk", "Give away")
    )

    title = models.CharField(max_length=150, unique=False, blank=False)
    price = models.PositiveIntegerField(unique=False, blank=False)
    advert_location = models.CharField(max_length=30, unique=False, blank=False)
    type = models.CharField(choices=TYPES, max_length=10)
    advert_description = models.TextField(blank=True)
    seller = models.ForeignKey(Account, on_delete=models.CASCADE)
    date_created = models.DateField(auto_now_add=True)
    categorie = models.CharField(max_length=20, choices=CATEGORIES)
    image = models.ImageField(upload_to="images/listings")
    phone_number = models.IntegerField()


class PhoneModel(models.Model):

    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+9999999999'.",
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=16, blank=True)




class Advertisement(models.Model):
    company_name = models.CharField(max_length=50)
    title = models.CharField(max_length=150, unique=False)
    published = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='images/advertisements', blank=True)
    advertisement_description = models.CharField(max_length=150, unique=False)
    owner = models.ForeignKey(Advertiser, on_delete=models.CASCADE)
# class Categories(models.TextChoices):
