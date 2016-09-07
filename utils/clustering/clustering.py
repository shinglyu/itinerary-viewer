from math import radians, cos, sin, asin, sqrt
# from sklearn.cluster import AffinityPropagation
# from sklearn.cluster import SpectralClustering
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics.pairwise import pairwise_distances
import xml.etree.ElementTree as et


def haversine(coor1, coor2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    Credit: Michael Dunn from StackOverflow
    """
    # convert decimal degrees to radians
    lon1, lat1 = coor1
    lon2, lat2 = coor2
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers. Use 3956 for miles
    return c * r


def parse_kml(filename):
    return et.parse(filename).getroot()


def main():
    # TODO: commandline arguments: input file, cluster count
    # TODO: make this dynamic
    tree = parse_kml('data/berlin.kml')
    # print(tree)
    placemarks = tree.findall('*/Placemark')
    names = map(lambda n: n.find('name').text, placemarks)
    # Descriptions may be the address or the name
    descs = map(lambda n: n.find('description').text, placemarks)
    coors = map(lambda n: n.find('Point/coordinates').text, placemarks)
    coors_tuples = map(lambda c: (float(c.split(',')[0]),
                                  float(c.split(',')[1])), coors)
    # print(names)
    # print(coors)
    # print(coors_tuples)

    # samples = [(0,0), (1,1), (1,0), (45,45), (45,46), (46,45)]
    # TODO: use real traffic distance based on Google Map API
    distance_matrix = pairwise_distances(X=coors_tuples, metric=haversine)
    # print(distance_matrix)

    # distance_matrix = [
    #    [1,2,3],
    #    [2,5,6],
    #    [3,6,4]
    # ]

    # ap = AffinityPropagation(affinity="precomputed")
    # labels = ap.fit_predict(distance_matrix)

    # sc = SpectralClustering(n_clusters=2, affinity="precomputed")
    # labels = sc.fit_predict(distance_matrix)

    # TODO: Make the cluster count dynamic, maybe based on days or days*2
    sc = AgglomerativeClustering(n_clusters=8,
                                 affinity="precomputed",
                                 linkage="complete")
    labels = sc.fit_predict(distance_matrix)
    # print(labels)

    # TODO: Rearrange the order based on Traveling Saleman Problem

    for i in range(0, max(labels)):
        print("Group {}:".format(i))
        for label, name, desc in zip(labels, names, descs):
            if label == i:
                print u"  - sight: {}".format(name)
                if desc != name:
                    print u"    address: {}".format(desc)
        print("")

if __name__ == "__main__":
    main()
