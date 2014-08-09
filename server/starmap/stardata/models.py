from django.db import models

class Star(models.Model):
    starid = models.IntegerField()
    hip = models.IntegerField(null=True, blank=True)
    hd = models.IntegerField(null=True, blank=True)
    hr = models.IntegerField(null=True, blank=True)
    gliese = models.CharField(max_length=20, null=True, blank=True)
    bayerflamsteed = models.CharField(max_length=200, null=True, blank=True)
    propername = models.CharField(max_length=200, null=True, blank=True)
    ra = models.FloatField()
    dec = models.FloatField()
    distance = models.FloatField()
    pmra = models.FloatField()
    pmdec = models.FloatField()
    rv = models.FloatField(null=True, blank=True)
    mag = models.FloatField()
    absmag = models.FloatField()
    spectrum = models.CharField(max_length=20, null=True, blank=True)
    colorindex = models.FloatField(null=True, blank=True)
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    vx = models.FloatField()
    vy = models.FloatField()
    vz = models.FloatField()
    id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'hyg'
        managed = False