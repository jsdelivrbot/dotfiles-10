Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.provider = provider;
exports.suggestionsList = suggestionsList;
exports.suggestionsShow = suggestionsShow;

function provider(entry) {
  var message = undefined;
  if (!entry || typeof entry !== 'object') {
    message = 'Invalid provider provided';
  } else if (!Array.isArray(entry.grammarScopes)) {
    message = 'Invalid or no grammarScopes found on provider';
  } else if (typeof entry.getIntentions !== 'function') {
    message = 'Invalid or no getIntentions found on provider';
  }
  if (message) {
    console.log('[Intentions] Invalid provider', entry);
    throw new Error(message);
  }
}

function suggestionsList(suggestions) {
  if (Array.isArray(suggestions)) {
    var suggestionsLength = suggestions.length;
    for (var i = 0; i < suggestionsLength; ++i) {
      var suggestion = suggestions[i];
      var message = undefined;
      if (typeof suggestion.title !== 'string') {
        message = 'Invalid or no title found on intention';
      } else if (typeof suggestion.selected !== 'function') {
        message = 'Invalid or no selected found on intention';
      }
      if (message) {
        console.log('[Intentions] Invalid suggestion of type list', suggestion);
        throw new Error(message);
      }
    }
  }
  return suggestions;
}

function suggestionsShow(suggestions) {
  if (Array.isArray(suggestions)) {
    var suggestionsLength = suggestions.length;
    for (var i = 0; i < suggestionsLength; ++i) {
      var suggestion = suggestions[i];
      var message = undefined;
      if (typeof suggestion.range !== 'object' || !suggestion.range) {
        message = 'Invalid or no range found on intention';
      } else if (suggestion['class'] && typeof suggestion['class'] !== 'string') {
        message = 'Invalid class found on intention';
      } else if (typeof suggestion.created !== 'function') {
        message = 'Invalid or no created found on intention';
      }
      if (message) {
        console.log('[Intentions] Invalid suggestion of type show', suggestion);
        throw new Error(message);
      }
    }
  }
  return suggestions;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvdmFsaWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlPLFNBQVMsUUFBUSxDQUFDLEtBQXVDLEVBQUU7QUFDaEUsTUFBSSxPQUFPLFlBQUEsQ0FBQTtBQUNYLE1BQUksQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3ZDLFdBQU8sR0FBRywyQkFBMkIsQ0FBQTtHQUN0QyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUM5QyxXQUFPLEdBQUcsK0NBQStDLENBQUE7R0FDMUQsTUFBTSxJQUFJLE9BQU8sS0FBSyxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQUU7QUFDcEQsV0FBTyxHQUFHLCtDQUErQyxDQUFBO0dBQzFEO0FBQ0QsTUFBSSxPQUFPLEVBQUU7QUFDWCxXQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ25ELFVBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7R0FDekI7Q0FDRjs7QUFFTSxTQUFTLGVBQWUsQ0FBQyxXQUE0QixFQUFtQjtBQUM3RSxNQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDOUIsUUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFBO0FBQzVDLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUMxQyxVQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakMsVUFBSSxPQUFPLFlBQUEsQ0FBQTtBQUNYLFVBQUksT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUN4QyxlQUFPLEdBQUcsd0NBQXdDLENBQUE7T0FDbkQsTUFBTSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDcEQsZUFBTyxHQUFHLDJDQUEyQyxDQUFBO09BQ3REO0FBQ0QsVUFBSSxPQUFPLEVBQUU7QUFDWCxlQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3ZFLGNBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7T0FDekI7S0FDRjtHQUNGO0FBQ0QsU0FBTyxXQUFXLENBQUE7Q0FDbkI7O0FBRU0sU0FBUyxlQUFlLENBQUMsV0FBaUMsRUFBd0I7QUFDdkYsTUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQzlCLFFBQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQTtBQUM1QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDMUMsVUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLFVBQUksT0FBTyxZQUFBLENBQUE7QUFDWCxVQUFJLE9BQU8sVUFBVSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQzdELGVBQU8sR0FBRyx3Q0FBd0MsQ0FBQTtPQUNuRCxNQUFNLElBQUksVUFBVSxTQUFNLElBQUksT0FBTyxVQUFVLFNBQU0sS0FBSyxRQUFRLEVBQUU7QUFDbkUsZUFBTyxHQUFHLGtDQUFrQyxDQUFBO09BQzdDLE1BQU0sSUFBSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ25ELGVBQU8sR0FBRywwQ0FBMEMsQ0FBQTtPQUNyRDtBQUNELFVBQUksT0FBTyxFQUFFO0FBQ1gsZUFBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUN2RSxjQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO09BQ3pCO0tBQ0Y7R0FDRjtBQUNELFNBQU8sV0FBVyxDQUFBO0NBQ25CIiwiZmlsZSI6Ii9Vc2Vycy9DcmlzRm9ybm8vLmF0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvdmFsaWRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdHlwZSB7IExpc3RQcm92aWRlciwgTGlzdEl0ZW0sIEhpZ2hsaWdodFByb3ZpZGVyLCBIaWdobGlnaHRJdGVtIH0gZnJvbSAnLi90eXBlcydcblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVyKGVudHJ5OiBMaXN0UHJvdmlkZXIgfCBIaWdobGlnaHRQcm92aWRlcikge1xuICBsZXQgbWVzc2FnZVxuICBpZiAoIWVudHJ5IHx8IHR5cGVvZiBlbnRyeSAhPT0gJ29iamVjdCcpIHtcbiAgICBtZXNzYWdlID0gJ0ludmFsaWQgcHJvdmlkZXIgcHJvdmlkZWQnXG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZW50cnkuZ3JhbW1hclNjb3BlcykpIHtcbiAgICBtZXNzYWdlID0gJ0ludmFsaWQgb3Igbm8gZ3JhbW1hclNjb3BlcyBmb3VuZCBvbiBwcm92aWRlcidcbiAgfSBlbHNlIGlmICh0eXBlb2YgZW50cnkuZ2V0SW50ZW50aW9ucyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIG1lc3NhZ2UgPSAnSW52YWxpZCBvciBubyBnZXRJbnRlbnRpb25zIGZvdW5kIG9uIHByb3ZpZGVyJ1xuICB9XG4gIGlmIChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coJ1tJbnRlbnRpb25zXSBJbnZhbGlkIHByb3ZpZGVyJywgZW50cnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Z2dlc3Rpb25zTGlzdChzdWdnZXN0aW9uczogQXJyYXk8TGlzdEl0ZW0+KTogQXJyYXk8TGlzdEl0ZW0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3VnZ2VzdGlvbnMpKSB7XG4gICAgY29uc3Qgc3VnZ2VzdGlvbnNMZW5ndGggPSBzdWdnZXN0aW9ucy5sZW5ndGhcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Z2dlc3Rpb25zTGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9uc1tpXVxuICAgICAgbGV0IG1lc3NhZ2VcbiAgICAgIGlmICh0eXBlb2Ygc3VnZ2VzdGlvbi50aXRsZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWVzc2FnZSA9ICdJbnZhbGlkIG9yIG5vIHRpdGxlIGZvdW5kIG9uIGludGVudGlvbidcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1Z2dlc3Rpb24uc2VsZWN0ZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbWVzc2FnZSA9ICdJbnZhbGlkIG9yIG5vIHNlbGVjdGVkIGZvdW5kIG9uIGludGVudGlvbidcbiAgICAgIH1cbiAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbSW50ZW50aW9uc10gSW52YWxpZCBzdWdnZXN0aW9uIG9mIHR5cGUgbGlzdCcsIHN1Z2dlc3Rpb24pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VnZ2VzdGlvbnNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Z2dlc3Rpb25zU2hvdyhzdWdnZXN0aW9uczogQXJyYXk8SGlnaGxpZ2h0SXRlbT4pOiBBcnJheTxIaWdobGlnaHRJdGVtPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuICAgIGNvbnN0IHN1Z2dlc3Rpb25zTGVuZ3RoID0gc3VnZ2VzdGlvbnMubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWdnZXN0aW9uc0xlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnNbaV1cbiAgICAgIGxldCBtZXNzYWdlXG4gICAgICBpZiAodHlwZW9mIHN1Z2dlc3Rpb24ucmFuZ2UgIT09ICdvYmplY3QnIHx8ICFzdWdnZXN0aW9uLnJhbmdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSW52YWxpZCBvciBubyByYW5nZSBmb3VuZCBvbiBpbnRlbnRpb24nXG4gICAgICB9IGVsc2UgaWYgKHN1Z2dlc3Rpb24uY2xhc3MgJiYgdHlwZW9mIHN1Z2dlc3Rpb24uY2xhc3MgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSW52YWxpZCBjbGFzcyBmb3VuZCBvbiBpbnRlbnRpb24nXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWdnZXN0aW9uLmNyZWF0ZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbWVzc2FnZSA9ICdJbnZhbGlkIG9yIG5vIGNyZWF0ZWQgZm91bmQgb24gaW50ZW50aW9uJ1xuICAgICAgfVxuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tJbnRlbnRpb25zXSBJbnZhbGlkIHN1Z2dlc3Rpb24gb2YgdHlwZSBzaG93Jywgc3VnZ2VzdGlvbilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdWdnZXN0aW9uc1xufVxuIl19