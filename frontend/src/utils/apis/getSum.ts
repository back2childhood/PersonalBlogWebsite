export const getSum = async (dbName: string, where?: object) => {
    const data = await fetch("/assets/sum.json")
        .then((res) => res.json());
    return data[dbName];
}
// db
//   .collection(dbName)
//   .where(where || {})
//   .count()
//   .then(res => res)
//   .catch(err => err);