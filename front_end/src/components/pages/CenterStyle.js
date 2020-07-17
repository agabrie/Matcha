const CenterStyle = (top) => {
	return {
		margin: 5,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		// width: '100%',
		marginTop:parseInt(top)
	}
}
export { CenterStyle }
export default CenterStyle