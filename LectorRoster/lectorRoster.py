import pandas as pds

#read from csv file
roster = pds.read_csv("LectorsListA.csv")
print(roster)

df = roster.iloc[0]

# print excel
print(df);