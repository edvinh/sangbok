export async function getSongs () { // eslint-disable-line
  const res = await fetch('http://www.dsek.se/arkiv/sanger/api.php?showAll') // eslint-disable-line
  return res.json()
}
