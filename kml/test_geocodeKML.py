import geocodeKML
def test_parseAddresses():
  addressesText = '''
  Mozilla HQ; 331 E Evelyn Ave, Mountain View, CA 94041
  Mozilla Paris; 16 Boulevard Montmartre, 75009 Paris
  '''

  assert geocodeKML.parseAddresses(addressesText) == [
      {'name':'Mozilla HQ', 'address':'331 E Evelyn Ave, Mountain View, CA 94041'},
      {'name':'Mozilla Paris', 'address': '16 Boulevard Montmartre, 75009 Paris'}
  ]
