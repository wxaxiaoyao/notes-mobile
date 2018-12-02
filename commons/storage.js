
class Storage {
	static set(key, data) {
		try {
			uni.setStorageSync(key, data);
		} catch(e) {
			return false;
		}

		return true;
	}

	static get(key) {
		try {
			return uni.getStorageSync(key);
		} catch(e) {
			return ;
		}
	}
}

export default Storage;
