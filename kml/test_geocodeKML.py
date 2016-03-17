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

def test_parseAddresses_only_name():
  addressesText = '''
  Mozilla HQ
  '''

  assert geocodeKML.parseAddresses(addressesText) == [
      {'name':'Mozilla HQ', 'address':'Mozilla HQ'},
  ]

def test_parseAddresses_comment():
  addressesText = '''
  # This is a comment
  London
  '''

  assert geocodeKML.parseAddresses(addressesText) == [
      {'name':'London', 'address':'London'},
  ]

def test_parseAddresses_inline_comment():
  addressesText = '''
  # This is a comment
  London # Comment
  London; foo # Comment
  '''

  assert geocodeKML.parseAddresses(addressesText) == [
      {'name':'London', 'address':'London'},
      {'name':'London', 'address':'foo'},
  ]
