
// const PopOverMUI = () => {

//     return (
//         <>
//             <button
//                 color="inherit"
//                 disableRipple
//                 onClick={e => setOpenSort(e.currentTarget)}
//                 endIcon={<Iconify icon={openSort ? 'bi:sort-up-alt' : 'bi:sort-down'} />}
//             // startIcon={<Iconify icon='bxs:sort-alt' />}
//             >Sort By:&nbsp;<b>{label}</b>
//             </button>
//             <Popover
//                 anchorEl={openSort}
//                 open={Boolean(openSort)}
//                 onClose={e => setOpenSort(null)}
//                 // onClick={() => { setReload(false) }}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             > <div className="sortOption">
//                     {SORT_BY_OPTIONS.map((option) => (
//                         <button className='selectBtn' key={option.label} value={option.value}
//                             onClick={(e) => {
//                                 setLabel(option.label); setOpenSort(null);
//                                 handleSort(e, option.value, option.state)
//                             }} >
//                             {option.label}
//                         </button>
//                     ))}
//                 </div>
//             </Popover>
//         </>
//     );
// };

// export default PopOverMUI;
// this component needs material ui to be installed therefore no export;